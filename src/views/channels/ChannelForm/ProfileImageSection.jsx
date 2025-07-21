import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import {Button} from '@/components/ui'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import {Controller} from 'react-hook-form'
import {HiOutlineUser} from 'react-icons/hi'
import useTranslation from "@/utils/hooks/useTranslation.js";

const ProfileImage = ({control}) => {

    const {t} = useTranslation()

    const beforeUpload = (files) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
    }

    return (
        <Card>
            <h4 className="mb-6">{t('Image')}</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4">
                <div className="text-center">
                    <Controller
                        name="img"
                        control={control}
                        render={({field}) => (
                            <>
                                <div className="flex items-center justify-center">
                                    {field.value ? (
                                        <Avatar
                                            size={100}
                                            className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                            icon={<HiOutlineUser/>}
                                            src={field.value}
                                        />
                                    ) : (
                                        <DoubleSidedImage
                                            src="/img/others/upload.png"
                                            darkModeSrc="/img/others/upload-dark.png"
                                            alt="Upload image"
                                        />
                                    )}
                                </div>
                                <Upload
                                    showList={false}
                                    uploadLimit={1}
                                    beforeUpload={beforeUpload}
                                    onChange={(files) => {
                                        if (files.length > 0) {
                                            const reader = new FileReader()
                                            reader.onloadend = () => {
                                                field.onChange(reader.result)
                                            }
                                            reader.readAsDataURL(files[0])
                                        }
                                    }}
                                >
                                    <Button
                                        variant="solid"
                                        className="mt-4"
                                        type="button"
                                    >
                                        {t(field.value ? 'Change' : 'Upload')}

                                    </Button>
                                </Upload>
                            </>
                        )}
                    />
                </div>
            </div>
        </Card>
    )
}

export default ProfileImage
