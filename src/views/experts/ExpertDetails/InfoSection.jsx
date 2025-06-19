import {useMemo} from 'react'
import Card from '@/components/ui/Card'
import {countryList} from '@/constants/countries.constant'

const InfoSection = ({data}) => {
    const countryName = useMemo(() => {
        return countryList.find(
            (country) => country.value === data.personalInfo?.country,
        )?.label
    }, [data?.country])

    return (
        <>
            <div className="flex flex-col gap-4">
                <Card>
                    <div className="font-bold heading-text">
                        Personal
                    </div>
                    <div className="mt-4 flex flex-col gap-1 font-semibold">
                        <span>{data?.address}</span>
                        <span><b className="mr-2">Selected Platform: </b>{data?.user?.platform}</span>
                        <span><b className="mr-2">Platform Username: </b>{data?.user?.platform_username}</span>
                        <span><b className="mr-2">Selected Plan: </b> {data.plan?.name.toUpperCase()}</span>
                        <span><b className="mr-2">Social Links: </b> {data.other_links}</span>
                    </div>
                </Card>
                <Card>
                    <div className="font-bold heading-text">
                        Business
                    </div>
                    <div className="mt-4 flex flex-col gap-1 font-semibold">
                        <span>{data.personalInfo?.address}</span>
                        <span><b className="mr-2">Legal Type: </b>{data.legal_type}</span>
                        <span><b className="mr-2">Business Name: </b>{data.business_name}</span>
                        <span><b className="mr-2">Registration Number: </b>{data.registration_number}</span>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default InfoSection
