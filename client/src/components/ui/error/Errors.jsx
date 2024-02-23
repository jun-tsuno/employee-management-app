export const ErrorLabel = ({ message, className }) => {
	return (
		<div
			className={`flex items-center gap-2 font-[500] text-sm  bg-pink py-1 px-6 text-error w-fit mx-auto rounded-md ${
				className ? className : ''
			}`}
		>
			<span>Error : </span>
			<span>{message}</span>
		</div>
	);
};
