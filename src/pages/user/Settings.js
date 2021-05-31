import { useState } from "react";
import { useAuth } from "../../providers/ProvideAuth";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
export const Settings = () => {
	const history = useHistory();
	const auth = useAuth();

	const user = auth.user;

	const [data, setData] = useState({});

	const handleChange = (e) => {
		const target = e.target;
		setData({ ...data, [target.name]: target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.update(data);
			toast("Your account was updated.");
		} catch (_error) {
			const error = _error.response?.data;
			toast.error(error?.message || "Unknown error occured. Try again later.");
		}
	};

	return (
		<div className="container" style={{ maxWidth: "40rem" }}>
			<div className="content">
				<h1>Settings</h1>
				<form onSubmit={handleSubmit} onChange={handleChange}>
					<h4>Profile</h4>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input id="username" name="username" className="form-control disabled" readOnly defaultValue={user.username} />
					</div>
					<div className="form-group">
						<label htmlFor="displayName">Display name</label>
						<input id="displayName" name="displayName" placeholder="Display name" className="form-control" defaultValue={user.displayName || ""} />
					</div>
					<input className="btn btn-primary btn-block" type="submit" value="Update Profile" />
				</form>
			</div>
		</div>
	);
};
