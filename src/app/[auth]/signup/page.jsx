"use client";

function handleSignUp(){}

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>  
        <form onSubmit={handleSignUp = (e) =>{
          e.preventDefault();
          const name = e.target.elements.name.value;
          const email = e.target.elements.email.value;
          const password = e.target.elements.password.value;
          const organizationName = e.target.elements.organizationName.value;
          const headquartersAddress = e.target.elements.headquartersAddress.value;
          const formData = {
            name,
            email,
            password,
            organizationName,
            headquartersAddress
          }
          console.log(formData);

        }}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="organizationName" placeholder="Organization Name" />
        <input type="text" name="headquartersAddress" placeholder="Headquarter Address" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
} 

