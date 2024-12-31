import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import React from 'react';

const avatarVariants = cva(
    "object-cover w-full h-full rounded-full shrink-0",
    {
        variants: {
            variant: {
                default: "",
            },
            size: {
                default: "w-10 h-10",
                sm: "w-8 h-8",
                lg: "w-12 h-12",
                xl: "w-28 h-28",
                icon: "w-10 h-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Avatar = React.forwardRef(({ className, variant, size, url, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "img"

    return (
        (<Comp
            src={url}
            className={cn(avatarVariants({ variant, size, className }))}
            ref={ref}
            alt="Avatar"
            {...props} />)
    );
})
Avatar.displayName = "Avatar"

Avatar.propTypes = {
    url: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    asChild: PropTypes.bool
}

export { Avatar, avatarVariants }