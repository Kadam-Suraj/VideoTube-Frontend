import { FileCheck, FileUp, FileVideo, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Title } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addVideo } from "@/api/video.api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Progress } from "../ui/progress";

const formSchema = z.object({
    videoFile: z
        .instanceof(File, { message: "File must be a video." })
        .refine((file) => file.type.startsWith("video/"), { message: "File must be a valid video type." })
    // .refine((file) => file.size <= 50000000, { message: "File size must be less than 50MB." }),
    ,
    thumbnail: z
        .instanceof(File, { message: "File must be an image." })
        .refine((file) => file.type.startsWith("image/"), { message: "File must be a valid image type." })
        .refine((file) => file.size <= 5000000, { message: "Thumbnail size must be less than 5MB." }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
});

const UploadVideo = () => {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [value, setValue] = useState(null);
    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(0);
    const [abortController, setAbortController] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            videoFile: null,
            thumbnail: null,
            title: "",
            description: "",
        },
    });

    async function onSubmit(values) {
        const controller = new AbortController(); // Create an AbortController
        const signal = controller.signal;

        setIsUploading(true);
        setValue(values);

        window.addEventListener("beforeunload", (e) => {
            if (isUploading) {
                e.preventDefault();
                e.returnValue = "";
            }
        });

        // Store controller to cancel later
        setAbortController(controller);

        const response = await addVideo(
            values,
            (progress) => {
                // You can update a progress bar here
                setProgress(progress);
            },
            signal
        );
        if (response.data.success) {
            setVideo(response.data.success);
            toast({
                variant: "success",
                title: "Video uploaded successfully",
            })
        }

        if (!response.data.success) {
            setVideo(response.data.success);
            toast({
                variant: "destructive",
                title: "Video upload failed",
            })
        };
    }

    const handleCancel = () => {
        if (abortController) {
            abortController.abort(); // Cancel the request
            setIsUploading(false);
            toast({
                variant: "default",
                title: "Upload cancelled",
            });
        }
    };

    return (
        <>
            {
                !isUploading ?
                    <Dialog>
                        <DialogTrigger>
                            <Title className="flex items-center gap-2 px-3 py-2 font-medium rounded-md bg-accent-foreground text-background">
                                <FileUp /> Upload
                            </Title>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload Video</DialogTitle>
                                <DialogDescription>
                                    Upload your video.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                                    {/* Video File */}
                                    <FormField
                                        control={form.control}
                                        name="videoFile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Video file *</FormLabel>
                                                <FormControl >
                                                    <div
                                                        className="flex flex-col items-center justify-center w-full gap-5 p-4 border border-dashed min-h-60"
                                                        onDragOver={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            field.onChange(e.dataTransfer.files[0]);
                                                        }}
                                                    >
                                                        <Upload size={40} />
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <span className="font-semibold">Drag and drop video files to upload</span>
                                                            <span className="text-sm">Your videos will be private until you publish them.</span>
                                                        </div>
                                                        <Input
                                                            className="cursor-pointer w-fit"
                                                            type="file"
                                                            name="videoFile"
                                                            accept=".mp4, .mov, .avi"
                                                            onChange={(e) => field.onChange(e.target.files[0])} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Thumbnail */}
                                    <FormField
                                        control={form.control}
                                        name="thumbnail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Thumbnail *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="cursor-pointer"
                                                        type="file"
                                                        name="thumbnail"
                                                        accept="image/*"
                                                        onChange={(e) => field.onChange(e.target.files[0])}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    thumbnail size must be less than 5MB.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Video title *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter video title" type="text" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Video description *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter video description"
                                                        className="resize-none min-h-14 focus-visible:ring-transparent"
                                                        rows={Math.max(1, field.value.split("\n").length)}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit"
                                        // disabled={!form.formState.isValid}
                                        className="self-end">Upload</Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                    :
                    <Dialog>
                        <DialogTrigger>
                            <Title className="flex items-center gap-2 px-3 py-2 font-medium rounded-md bg-accent-foreground text-background">
                                <FileUp /> Uploading...
                            </Title>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {video ? "Upload success" : "Uploading..."}
                                </DialogTitle>
                                <DialogDescription>
                                    {video ? "Video uploaded successfully." : "Uploading..."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center gap-2">
                                    <FileVideo />
                                    <div className="flex flex-col">
                                        <span className="flex items-center gap-1 text-sm">
                                            File name:
                                            <h3 className="overflow-hidden text-base font-medium text-ellipsis line-clamp-1">
                                                {value?.title}
                                            </h3>
                                        </span>
                                        <span className="flex items-center gap-1 text-sm">Size:
                                            <h3 className="text-base font-medium">
                                                {(value?.videoFile?.size / 1024 / 1024).toFixed(2)} MB
                                            </h3>
                                        </span>
                                    </div>
                                </div>
                                {
                                    !video ?
                                        <div className="">
                                            <button type="button" className="inline-flex items-center px-4 py-2 mx-auto text-sm font-semibold leading-6 transition duration-150 ease-in-out pointer-events-none text-accent-foreground h-fit w-fit">
                                                <svg className="w-5 h-5 mr-3 -ml-1 text-accent-foreground animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75 fill-accent-foreground" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Uploading...
                                            </button>
                                            <Progress value={progress} />
                                        </div>
                                        :
                                        <div className="flex items-center justify-center gap-2">
                                            <FileCheck className={`${video ? "text-green-500" : "text-red-500"} animate-pulse`} />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm">{video ? "Video uploaded successfully" : "Video upload failed"}</span>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="flex items-center gap-3">
                                <Button className="flex-1" variant="outline" onClick={handleCancel}>Cancel</Button>
                                <Button className="flex-1" disabled={!video} onClick={() => { setIsUploading(false); setVideo(null) }}>Finish</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
            }
        </>
    );
};

export default UploadVideo;