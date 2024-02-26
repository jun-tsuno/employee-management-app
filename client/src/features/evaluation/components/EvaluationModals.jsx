import { CheckIcon } from '@public/svgs';
import ModalWrapper from '@/components/ui/modal/ModalWrapper';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';

export const EvaluationSuccessModal = ({ employeeId }) => {
	return (
		<ModalWrapper className='w-[90%] max-w-[500px]'>
			<div className='p-6 sm:px-14 sm:py-10 space-y-12'>
				<p className='text-center text-xl font-bold text-text-gray'>
					Updated Evaluation
				</p>
				<CheckIcon className='w-16 h-16 mx-auto text-green' />
				<div className='grid gap-3 '>
					<Link href='/evaluation'>
						<Button cancel className='w-full'>
							Evaluate another Employee
						</Button>
					</Link>
					<Link href={`/employees/${employeeId}`}>
						<Button primary className='w-full'>
							See Employee Detail
						</Button>
					</Link>
				</div>
			</div>
		</ModalWrapper>
	);
};
