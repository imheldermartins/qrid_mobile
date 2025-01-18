import clsx from "clsx";

interface AlertProps {
    message: string;
    type: 'success' | 'danger';
};

export const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return (
        <div className={clsx("p-3 rounded-full", {
            "bg-green-200 text-green-800": type === 'success',
            "bg-red-200 text-red-800": type === 'danger',
        })}>
            {message}
        </div>
    );
}