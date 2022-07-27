import clsx from "clsx";
function getClassName({className}){
    return clsx(
        "flex rounded-lg p-4 text-sm",
        className
    )
}

const variants ={
    success:"bg-green-100 text-green-700",
    danger:"bg-red-100 text-red-700"
}

export const Alert =({
    children,
    className,
    variant="success",
})=>{
    return(
        <div className={clsx(variants[variant],getClassName({className}))}>
            <div>
                {children}
            </div>
        </div>
    )
}