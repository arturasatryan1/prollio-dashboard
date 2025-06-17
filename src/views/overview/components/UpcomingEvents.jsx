import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import { CSVLink } from 'react-csv'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {TbCalendarEvent} from "react-icons/tb";

const { Tr, Td, TBody, THead, Th } = Table

const UpcomingEvents = ({ data }) => {

    const {t} = useTranslation();
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>{t('Upcoming Events')}</h4>
            </div>
            <div className="mt-6">
                <Table hoverable={false}>
                    <TBody>
                        {data.map((row) => {
                            return (
                                <Tr key={row.title}>
                                    <Td className="px-0!">
                                        <div className="flex gap-2">
                                            <TbCalendarEvent size={22}/>
                                            <div>
                                                <p className={`heading-text`}>{row.title}</p>
                                                <p> {row.date}</p>
                                            </div>
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default UpcomingEvents
