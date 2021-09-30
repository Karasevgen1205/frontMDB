import React, {useContext, useEffect, useState} from "react";
import {profileAPI} from "../../../../DAL/API";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {Loader} from "../../../common/Loader";
import {Upload, message, Layout} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';


export const ProfileAvaStatus = observer(() => {

    const {profile} = useContext(Context);
    const userName = profile.userName;
    const avatar = profile.avaUrl;
    const [loading, setLoading] = useState(false)

    const getProfileData = async () => {
        return await profileAPI.getProfileData()
    };
    useEffect(() => {
        profile.setPreload(true);
        getProfileData().then(res => {
            profile.setAvaUrl(res.data.avaUrl);
            profile.setUserName(res.data.userName);
            profile.setPreload(false);
        }).finally(profile.setPreload(false))
    }, []);


    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, async () => {
                try {
                    let response = await profileAPI.uploadAvatar(info.file.originFileObj);
                    profile.setAvaUrl(response.data.avaUrl);
                    return response.data
                } catch (e) {
                    console.log(e)
                }
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <Layout>
            <p>Hello {userName}</p>
            <br/>
            {profile.preload ? <Loader/> :
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {avatar ? <img src={avatar} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                </Upload>
            }
        </Layout>
    )
});