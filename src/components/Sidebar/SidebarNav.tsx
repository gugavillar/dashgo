import { Stack } from "@chakra-ui/react";
import { NavSection } from './NavSection';
import { NavLink } from './NavLink';
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from 'react-icons/ri';

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
                <NavLink icon={RiContactsLine}>Contatos</NavLink>
            </NavSection>
            <NavSection title="AUTOMAÇÃO">
                <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
                <NavLink icon={RiGitMergeLine}>Automação</NavLink>
            </NavSection>
        </Stack>
    )
}