import React,{ useState, useEffect } from "react";
import { postVerificationSignupRiors } from '../actions/actionsPost';
import { useSelector, useDispatch } from 'react-redux';


function SignupVerification() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        code : '',
    });

    const HandleInput = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const {success, error, ErrorField, loading} = useSelector((state) => state.verificationSignupRiorsState);

     useEffect(() => {
            console.log(success);
            console.log(error);
            console.log(ErrorField);

        }, [success, error, ErrorField])

    const submit = async (e) => {
            e.preventDefault();
            dispatch(postVerificationSignupRiors(formData));
    } 

    return (
        <div class="container">
            <h2>Email Verification</h2>

            { success && (
                 <div class="alert {{.Status}}">
                 {success}
                </div>
            )}
           

            { ErrorField && (
                <div class="alert {{.Status}}">
                    {ErrorField}
                </div>
            )}
            

            <form onSubmit={submit}>
                <div className="input-group">
                    <label htmlFor="code">Verification Code</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Enter your code"
                        required
                        onChange={HandleInput}
                    />
                </div>
                <button type="submit">Verify</button>
            </form>
        </div>
    )
}

export default SignupVerification;