import { Stack, Icon, Text } from "@chakra-ui/react";
import { NavSection } from './NavSection';
import { NavLink } from './NavLink';
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine, RiLogoutBoxLine } from 'react-icons/ri';
import { signOut } from "../../contexts/AuthContext";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
                <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink>
            </NavSection>
            <NavSection title="AUTOMAÇÃO">
                <NavLink href="/forms" icon={RiInputMethodLine}>Formulários</NavLink>
                <NavLink href="/automation" icon={RiGitMergeLine}>Automação</NavLink>
            </NavSection>
            <NavSection title="USUÁRIO">
                <NavLink href="#" onClick={signOut} icon={RiLogoutBoxLine}>Sair</NavLink>
            </NavSection>
        </Stack>
    )
}