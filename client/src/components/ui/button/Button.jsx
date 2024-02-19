import classNames from 'classnames';

const Button = ({ children, primary, className, type, ...rest }) => {
	const classes = classNames(
		`w-fit py-2 px-4 rounded-md hover:brightness-90 ${
			className ? className : ''
		}`,
		{
			'bg-primary text-white': primary,
		}
	);

	return (
		<>
			<button type={type || 'button'} className={classes} {...rest}>
				{children}
			</button>
		</>
	);
};

export default Button;
