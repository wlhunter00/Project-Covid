
const emails = [
	"talk2ajah@gmail.com",
	"ajahso4@yahoo.com"
]



const chars = ['a','b','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
				'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
				'1','2','3','4','5','6','7','8','9','0']
/*
	creates a unique pass code that would be used to authenticate users
*/
function createCode(){
	let code = '';
	let numOfChars = 5;
	for(let i = 0; i < numOfChars; i++){
		let charIndex = Math.floor(Math.random() * chars.length);
		code += chars[charIndex];
	}
	return code;
}

/*
	responsible for sending out emails 
*/
function sendEmail(email){
	if(emails.indexOf(email) > -1){
		let code = createCode();
		// send user email
		return {email:email, code:code,  success:true}
	}
	return {email:email, code:undefined, success:false}
}

module.exports = {
	sendEmail : sendEmail
}