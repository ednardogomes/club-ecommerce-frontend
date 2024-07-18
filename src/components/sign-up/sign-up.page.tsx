import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { FiLogIn } from "react-icons/fi";
import { addDoc, collection } from "firebase/firestore";
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CustomInput from "../custom-input/custom-input.component";
import Header from "../header/header.component";
import InputErrorMessage from "../input-error-message/input-error-message.component";
import Loading from "../loading/loading.component";

import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from "./sign-up.styles";

import { auth, db } from "../../config/firebase.config";
import { UserContext } from "../../contexts/user.context";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();

  const [isLoading, setIsLoading] = useState(false);

  const watchPassword = watch("password");

  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(userCredentials);
      await addDoc(collection(db, "users"), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: "firebase",
      });
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError("email", { type: "alreadyInUse" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>
          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              hasError={!!errors?.firstName}
              placeholder="Digite seu nome"
              {...register("firstName", { required: true })}
            />

            {errors?.firstName?.type === "required" && (
              <InputErrorMessage>O nome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              hasError={!!errors?.lastName}
              placeholder="Digite seu sobrenome"
              {...register("lastName", { required: true })}
            />

            {errors?.lastName?.type === "required" && (
              <InputErrorMessage>O sobrenome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder="Digite seu email"
              {...register("email", {
                required: true,
                validate: (value) => {
                  return isEmail(value);
                },
              })}
            />

            {errors?.email?.type === "required" && (
              <InputErrorMessage>O email é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === "alreadyInUse" && (
              <InputErrorMessage>
                Este e-mail já está sendo utilizado.
              </InputErrorMessage>
            )}

            {errors?.email?.type === "validate" && (
              <InputErrorMessage>
                Por favor, insira um email valido.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}
            {errors?.password?.type === "minLength" && (
              <InputErrorMessage>
                A senha deve ter no mínimo 8 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confimação de senha</p>
            <CustomInput
              hasError={!!errors?.passwordConfirmation}
              placeholder="Digite novamente sua senha"
              type="password"
              {...register("passwordConfirmation", {
                required: true,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
            />

            {errors?.password?.type === "required" && (
              <InputErrorMessage>
                A confirmação da senha é obrigatória.
              </InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === "validate" && (
              <InputErrorMessage>
                A confirmação de senha precisa ser igual a senha
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton
            onClick={() => handleSubmit(handleSubmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Criar Conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;
