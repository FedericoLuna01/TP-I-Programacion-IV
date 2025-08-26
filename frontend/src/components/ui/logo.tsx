import { BookKeyIcon } from "lucide-react";

const Logo = () => {
	return (
		<div className="flex items-center gap-3 ">
			<div className="flex h-10 w-10 items-center justify-center rounded-lg text-white bg-gradient-primary">
				<BookKeyIcon className="h-6 w-6" />
			</div>
			<div>
				<h1 className="text-3xl font-bold text-transparent bg-gradient-primary bg-clip-text">
					Guideon
				</h1>
			</div>
		</div>
	);
};

export default Logo;
