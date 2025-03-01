function Validation(values)
{
    //Used Regular Expressions
    let error={};
    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (values.email === "")
    {
        error.email = "Email is required";
    }
    else if(!email_pattern.test(values.email))
    {
        error.email = "Email is invalid";
    }
    else
    {
        error.email = "";
    }

    if(values.password==="")
    {
        error.password = "Password is required";
    }
    else if(!password_pattern.test(values.password))
    {
        error.password = "Password is invalid";
    }
    else
    {
        error.password = "";
    }

    return error;
}

export default Validation;