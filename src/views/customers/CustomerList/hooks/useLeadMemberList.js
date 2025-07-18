import { apiGetLeadMembersList } from '@/services/CustomerService.js';
import useSWRMutation from 'swr/mutation';
import { useLeadMembersListStore } from '../store/leadMemberListStore.js';

export default function useLeadMemberList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedLeadMembers,
        setSelectedLeadMembers,
        setFilterData,
    } = useLeadMembersListStore((state) => state);

    const {
        data,
        error,
        trigger: fetchLeadMembers,
        isMutating: isLoading,
    } = useSWRMutation(
        '/api/dashboard/customers',
        (_, { arg }) => apiGetLeadMembersList(arg)
    );

    const leadMemberList = data?.data || [];
    const leadMemberListTotal = data?.total || 0;

    return {
        leadMemberList,
        leadMemberListTotal,
        fetchLeadMembers,
        isLoading,
        error,
        tableData,
        filterData,
        setTableData,
        selectedLeadMembers,
        setSelectedLeadMembers,
        setFilterData,
    };
}
