import { format, parseISO } from "date-fns"

type DateTimeProps = {
    value: string,
    title?: string,
    className?: string,
}

export default function DateTime({ value, title, className } : DateTimeProps ){
    return (
        <time title={title} className={className} dateTime={value}>
            {format(parseISO(value), "yyyy-MM-dd")}
        </time>
    )
}