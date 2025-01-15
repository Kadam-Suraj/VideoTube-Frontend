import { FileCheck, FileImage, FileUp, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Title } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Progress } from "../ui/progress";
import PropTypes from "prop-types";

const formSchema = z.object({
    image: z
        .instanceof(File, { message: "File must be a image." })
        .refine((file) => file.type.startsWith("image/"), { message: "File must be a valid image type." })
    // .refine((file) => file.size <= 50000000, { message: "File size must be less than 50MB." }),
});

const UploadImage = ({ children, api, type }) => {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [value, setValue] = useState(null);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [abortController, setAbortController] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
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

        const response = await api(
            { [type == "cover image" ? "coverImage" : type]: values.image },
            (progress) => {
                console.log(`Upload Progress: ${progress}%`);
                // You can update a progress bar here
                setProgress(progress);
            },
            signal
        );
        if (response.data.success) {
            setImage(response.data.success);
            toast({
                variant: "success",
                title: "Image uploaded successfully",
            })
        }

        if (!response.data.success) {
            setImage(response.data.success);
            toast({
                variant: "destructive",
                title: "Image upload failed",
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
                            {children}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload {type}</DialogTitle>
                                <DialogDescription>
                                    Upload your image.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{type} *</FormLabel>
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
                                                            <span className="font-semibold">Drag and drop image to upload</span>
                                                        </div>
                                                        <Input
                                                            className="cursor-pointer w-fit"
                                                            type="file"
                                                            name="image"
                                                            accept="image/*"
                                                            onChange={(e) => field.onChange(e.target.files[0])} />
                                                    </div>
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
                    isUploading &&
                    <Dialog>
                        <DialogTrigger>
                            <Title className="flex items-center gap-2 px-3 py-2 font-medium rounded-md cursor-pointer">
                                <FileUp /> Uploading...
                            </Title>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {image ? "Upload success" : "Uploading..."}
                                </DialogTitle>
                                <DialogDescription>
                                    {image ? `${type} uploaded successfully.` : "Uploading..."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-10">
                                <div className="flex items-center gap-2">
                                    <FileImage />
                                    <div className="flex flex-col">
                                        <span className="flex items-center gap-1 text-sm">
                                            File name:
                                            <h3 className="overflow-hidden text-base font-medium text-ellipsis line-clamp-1">
                                                {type}
                                            </h3>
                                        </span>
                                        <span className="flex items-center gap-1 text-sm">Size:
                                            <h3 className="text-base font-medium">
                                                {(value?.image?.size / 1024 / 1024).toFixed(2)} MB
                                            </h3>
                                        </span>
                                    </div>
                                </div>
                                {
                                    !image ?
                                        <div className="">
                                            <button type="button" className="inline-flex items-center px-4 py-2 mx-auto text-sm font-semibold leading-6 transition duration-150 ease-in-out pointer-events-none text-accent-foreground h-fit w-fit">
                                                <svg className="w-5 h-5 mr-3 -ml-1 text-accent-foreground animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75 fill-accent-foreground" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                {
                                                    image ?
                                                        " Uploading..."
                                                        :
                                                        "Upload failed"
                                                }
                                            </button>
                                            <Progress value={progress} />
                                        </div>
                                        :
                                        <div className="flex items-center justify-center gap-2">
                                            <FileCheck className={`${image ? "text-green-500" : "text-red-500"} animate-pulse`} />
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm">{image ? `${type} uploaded successfully` : `${type} upload failed`}</span>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="flex items-center gap-3">
                                <Button className="flex-1" variant="outline" onClick={() => { handleCancel(); setIsUploading(false); setImage(null) }}>Cancel</Button>
                                <Button className="flex-1" disabled={!image} onClick={() => { setIsUploading(false); setImage(null) }}>Finish</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
            }
        </>
    );
};

UploadImage.propTypes = {
    children: PropTypes.node,
    api: PropTypes.func,
    type: PropTypes.string
};

export default UploadImage;