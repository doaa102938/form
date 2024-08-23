
import { isValidElement, useState } from 'react'
import './App.css'
import * as yup from "yup"
import alert from '../src/assets/images/icon-success-check.svg'
function App() {
  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    massage: '',
    gander: "",
    ruleAccpeted: false
  })

  const userSchema = yup.object().shape({
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup.string().email("Please enter a valid email address").required(),
    massage: yup.string().required("This field is required"),
    gander: yup.string().oneOf(["Male", "Female"], "Please select a query type"),
    ruleAccpeted: yup.boolean().oneOf([true], "To sumbit this form , please consent to being contacted")
  })
  //array of errors
  const [errorsArray, seterrorsArray] = useState([])

  const [isToastVisible, setIsToastVisible] = useState(false);



  async function textValidation() {
    try {
      const response = await userSchema.validate(formData, { abortEarly: false })
      console.log("Is Valid object", response)
      return true
    } catch (err) {
      var errors = []
      err.inner.forEach((error) => {
        // console.log(`${error.path} : ${error.message}`)
        errors.push({ key: error.path, message: error.message })
      });
      seterrorsArray(errors)
      return false
    }
  }


  async function handelonsubmit(event) {
    event.preventDefault()

    const isValid = await textValidation();
    if (isValid) {
      seterrorsArray([])
      setformData({ email: "", firstname: "", lastname: "", massage: "", ruleAccpeted: false })
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 3000);
    }
  }
  function handelOnchange(event) {
    const keyname = event.target.name
    var keyvalue = event.target.value
    const type = event.target.type
    if (type == "checkbox") {
      keyvalue = event.target.checked
    }


    setformData({
      ...formData,
      [keyname]: keyvalue
    })

  }

  return (
    <>

      <div className={`toast ${isToastVisible ? '' : 'hidden'}`}>
        <div>
          <img src={alert}></img>
          <label>Message Sent!</label>
        </div>
        <p>Thanks for completing the form.we'll be in touch soon! </p>
      </div>

      <form onSubmit={handelonsubmit} className='form'>

        <div>
          <label className='contactus' >Contact Us</label>
        </div>
        <div className='name'>
          <div className='firstAndError'>
            <div className='firstandlast'>
              <label htmlFor="firstname" className='title'>First Name <span>*</span></label>
              <input type="text" name='firstname' value={formData.firstname} onChange={handelOnchange} id='firstname' />
            </div>
            {errorsArray.map((error) => {
              if (error.key == "firstname") {
                return <label className='error'>{error.message}</label>
              }
              else { null }
            })}
          </div>
          <div className='lastAndError'>
            <div className='firstandlast'>
              <label htmlFor="lastname" className='title'>Last Name <span>*</span></label>
              <input type="text" name='lastname' value={formData.lastname} onChange={handelOnchange} />
            </div>
            {errorsArray.map((error) => {
              if (error.key == "lastname") {
                return <label className='error'>{error.message}</label>
              }
              else { null }
            })}
          </div>
        </div>
        <div className='email'> <label htmlFor="email" className='title'>Email Address <span>*</span></label>
          <input name='email' value={formData.email} onChange={handelOnchange} />
          {errorsArray.map((error) => {
            if (error.key == "email") {
              return <label className='error'>{error.message}</label>
            }
            else { null }
          })}
        </div>

        <div> <label className='title'>Query Type <span>*</span></label>
          <div className='Quarytype'>
            <div className='border'>

              <input type="radio" name='gander' value="Male" id='male' onChange={handelOnchange} />
              <label htmlFor="male" className='title'>General Enquiry</label>
            </div>

            <div className='border left'>
              <input type="radio" name='gander' value="Female" id='female' onChange={handelOnchange} />
              <label htmlFor="female" className='title'>Support Request</label>
            </div>

          </div>



          {errorsArray.map((error) => {
            if (error.key == "gander") {
              return <label className='error'>{error.message}</label>
            } else { null }
          }
          )}
        </div>
        <div className='message'> <label htmlFor="massage" className='title'>Message <span>*</span>        </label>
          <textarea name="massage" value={formData.massage} onChange={handelOnchange} ></textarea>
          {errorsArray.map((error) => {
            if (error.key == "massage") {
              return <label className='error'>{error.message}</label>
            }
            else { null }
          }
          )}
        </div>

        <div >
          <div className='checkbox'>
            <input type='checkbox' id='rules' onChange={handelOnchange} name='ruleAccpeted' checked={formData.ruleAccpeted}></input>
            <label htmlFor="rules" className='title'>I consent to being by the team <span>*</span></label>
          </div>
          {errorsArray.map((error) => {
            if (error.key == "ruleAccpeted") {
              return <label className='error'>{error.message}</label>
            } else { null }
          }
          )}
        </div>
        <button type='submit' /*disabled={!formData.ruleAccpeted}*/ > Submit</button >
      </form >
    </>
  )
}

export default App
