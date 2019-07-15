export const validateFields = (name,email) =>{
    let errors = null
    if(name ==='')
        errors= 'Please Enter a name Field'
    else {
        var re = /\S+@\S+\.\S+/;
        errors= (!re.test(email)) ? 'Please Enter valid Email' : null
    }
    return errors
}