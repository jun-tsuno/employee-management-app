import { GithubIcon } from '@public/svgs';

const Footer = () => {
	const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
	return (
		<>
			<footer className='w-full py-4 bg-primary'>
				<a
					href={githubUrl || '#'}
					target='_blank'
					className='w-fit flex hover:text-error items-center text-text-placeholder mx-12 gap-3'
				>
					<GithubIcon className='w-7 h-7' />
					Github
				</a>
			</footer>
		</>
	);
};

export default Footer;
