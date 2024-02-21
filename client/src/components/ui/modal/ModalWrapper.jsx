const ModalWrapper = ({ children, className }) => {
	return (
		<>
			<div
				className={`fixed left-1/2 top-1/2 z-[50] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white  ${
					className ? className : ''
				}`}
			>
				{children}
			</div>

			<div className='fixed left-0 top-0 z-[20] h-[100vh] w-[100vw] bg-[#2d344099]' />
		</>
	);
};

export default ModalWrapper;
