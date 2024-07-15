import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import CustomButton from "../../components/custom-button/custom-button.component";
import Header from "../../components/header/header.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import InputErrorMessage from "../../components/input-error-message/input-error-message.component";

import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from "./login.styles";
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // console.log({ userCredentials });
    } catch (error) {
      const _error = error as AuthError;
      console.log(error);
      if (_error.code === AuthErrorCodes.INVALID_IDP_RESPONSE) {
        setError("password", { type: "mismatch" });
        setError("email", { type: "mismatch" });
        return;
      }
    }
  };

  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>Entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder="Digite seu e-mail"
              {...register("email", {
                required: true,
                validate: (value) => {
                  return isEmail(value);
                },
              })}
            />

            {errors?.email?.type === "required" && (
              <InputErrorMessage>O email é obrigatório</InputErrorMessage>
            )}

            {errors?.email?.type === "validate" && (
              <InputErrorMessage>
                Por Favor, insira um e-mail válido.
              </InputErrorMessage>
            )}

            {errors?.email?.type === "mismatch" && (
              <InputErrorMessage>E-mail ou senha inválidos.</InputErrorMessage>
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register("password", { required: true })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === "mismatch" && (
              <InputErrorMessage>E-mail ou senha inválidos.</InputErrorMessage>
            )}
          </LoginInputContainer>

          {
            <CustomButton
              startIcon={<FiLogIn size={18} />}
              onClick={() => handleSubmit(handleSubmitPress)()}
            >
              Entrar
            </CustomButton>
          }
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
