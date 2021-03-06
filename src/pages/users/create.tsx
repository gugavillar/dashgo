import { Box, Flex, Heading, VStack, SimpleGrid, HStack, Button, Divider } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupApiAuth } from '../../services/apiAuth';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
    const router = useRouter();
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = api.post('/users', {
            user: {
                ...user,
                created_at: new Date()
            }
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    })

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values);
        router.push('/users');
    }
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input error={errors.name} name="name" label="Nome completo" {...register('name')} />
                            <Input error={errors.email} name="email" type="email" label="E-mail" {...register('email')} />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input error={errors.password} name="password" type="password" label="Senha" {...register('password')} />
                            <Input error={errors.password_confirmation} name="password_confirmation" type="password" label="Confirmação da senha" {...register('password_confirmation')} />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiAuthClient = setupApiAuth(ctx);
    const response = await apiAuthClient.get('me');
    return {
        props: {}
    }
}, { permissions: ['users.create'] })