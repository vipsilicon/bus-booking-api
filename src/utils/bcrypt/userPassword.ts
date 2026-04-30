import bcrypt from 'bcrypt';

export class UserPassword {
	private static readonly saltRounds: number = 10;

	static hashPassword = async (password: string): Promise<string> => {
		const salt = await bcrypt.genSalt(this.saltRounds);
		return bcrypt.hash(password, salt);
	};

	static comparePassword = async (
		password: string,
		hash: string
	): Promise<boolean> => {
		return bcrypt.compare(password, hash);
	};
}
