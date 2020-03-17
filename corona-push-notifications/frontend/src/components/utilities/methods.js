export const emailAddressCheck = (email)=> {
    if(!email){
        return {isValid:false, message:"Email cannot be empty"};
    }
	var emailRegex = /^[a-z][a-z0-9\-._]+@[a-z0-9]+(\.[a-z]+)+$/;
    
    if(email.length === 0){
        return {isValid:false, message:"Email is required"};
    }
	if(!emailRegex.test(email.toLowerCase())){
       return {isValid:false, message:"Invalid email address "};
		
	}
	return {isValid:true, message:""};
};
