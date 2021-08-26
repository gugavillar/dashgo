import { Flex, Stack, Button } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { withSSRGuest } from '../utils/withSSRGuest';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().trim().required('Senha obrigatória')
});

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  const errors = formState.errors;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
  }
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing="4">
          <Input error={errors.email} name="email" type="email" label="E-mail" {...register('email')} />
          <Input error={errors.password} name="password" type="password" label="Senha" {...register('password')} />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})