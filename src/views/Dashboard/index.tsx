import React, { useState } from 'react'
import { Button, Upload, List, Typography, message } from 'antd'
import axios from 'axios'

const FileUpload: React.FC = () => {
  const [fileList, setFileList] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const serverUrl = 'http://127.0.0.1:8000'

  const uploadPart = async (
    file: File,
    uploadId: string,
    chunkNumber: number,
    start: number,
    end: number
  ): Promise<{ part_number: number; etag: string }> => {
    const blob = file.slice(start, end)

    const data = new FormData()
    data.append('file', blob)

    const partRes = await axios.post(`${serverUrl}/upload_part/${file.name}/${uploadId}/${chunkNumber}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return { part_number: chunkNumber, etag: partRes.data.etag }
  }

  const completeUpload = async (
    file: File,
    uploadId: string,
    parts: { part_number: number; etag: string }[]
  ): Promise<boolean> => {
    const completeRes = await axios.post(
      `${serverUrl}/complete_multipart_upload/${file.name}/${uploadId}`,
      { parts },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return completeRes.data.status === 'complete'
  }

  const uploadFile = async () => {
    const chunkSize = 1024 * 1024 // 1MB

    for (const file of fileList) {
      const chunks = Math.ceil(file.size / chunkSize)
      let uploadId: string | undefined
      const parts: { part_number: number; etag: string }[] = []

      try {
        // Initialize multipart upload
        const initRes = await axios.post(`${serverUrl}/init_multipart_upload/${file.name}`)
        uploadId = initRes.data.upload_id

        for (let i = 0; i < chunks; i++) {
          const start = i * chunkSize
          const end = Math.min(start + chunkSize, file.size)
          const part = await uploadPart(file, uploadId, i + 1, start, end)
          parts.push(part)

          if (parts.length === chunks) {
            const isCompleted = await completeUpload(file, uploadId, parts)
            if (isCompleted) {
              message.success('Upload complete')
            }
          }
        }
      } catch (err) {
        console.error(err)
        message.error('An error occurred during upload.')
      }
    }
  }

  const listFiles = async () => {
    try {
      const res = await axios.get(`${serverUrl}/list_files`)
      setUploadedFiles(res.data.files)
    } catch (err) {
      console.error(err)
      message.error('An error occurred while fetching the files.')
    }
  }

  return (
    <div>
      <Upload.Dragger
        name="files"
        beforeUpload={(file) => {
          setFileList((oldFileList) => [...oldFileList, file])
          return false
        }}
      >
        <p className="ant-upload-drag-icon">
          <Typography.Title level={3}>Drag file to this area</Typography.Title>
        </p>
      </Upload.Dragger>
      <Button onClick={uploadFile}>Upload</Button>
      <Button onClick={listFiles}>List Files</Button>
      <List
        dataSource={uploadedFiles}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </div>
  )
}

export default FileUpload
