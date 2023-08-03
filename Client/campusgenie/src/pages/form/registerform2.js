import { Container, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './registerform.css'
const schema = yup.object().shape({
    email: yup
        .string("email should be a string")
        .email("please provide a valid email address")
        .required("email address is required"),
    password: yup
        .string("password should be a string")
        .min(8, "password should have a minimum length of 8")
        .max(16, "password should have a maximum length of 12")
        .required("password is required"),
    confirmPassword: yup
        .string("password should be a string")
        .oneOf([yup.ref("password")])
        .required("confirm password is required"),

});


function RegisterForm2() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const formSubmitHandler = (data) => {
        console.log(data);
      };

    return (
        <Container class='col-md-12 content-center'>
            <Form onSubmit={handleSubmit(formSubmitHandler)}>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                        {...register("email")}
                            type="email"
                            placeholder="enter email"
                            name="email"
                            id="email"
                            
                        />
                        {errors.email ? (
                            <span className="error-text1">{errors.email.message}</span>
                        ) : (
                            <></>
                        )}


                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                          {...register("password")}
                            type="password"
                            placeholder="enter Password"
                            name="password"
                            id="password"
                        />
                        {errors.password ? (
                            <span className="error-text1">{errors.password.message}</span>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formConfirmPassword">
                    <Form.Label column sm="2">
                        Confirmation
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control   
                        {...register("confirmPassword")}
                             type="password"
                            placeholder="confirm Password"
                          
                            name="confirmPassword"
                            id="confirmPassword"
                        />
                        {errors.confirmPassword ? (
                            <span className="error-text1">{errors.confirmPassword.message}</span>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            label="Male"
                            id="male"
                            name="gender"
                            inline
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            id="female"
                            name="gender"
                            inline
                        />
                        <Form.Check
                            type="radio"
                            label="Other"
                            id="other"
                            name="gender"
                            inline
                        />
                    </div>
                </Form.Group>
            </Form>

        </Container>
    );
}

export default RegisterForm2;