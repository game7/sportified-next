import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { default as React, useEffect, useRef, useState, VFC } from "react";
import { Button, Image, Menu, MenuItemProps, Modal } from "semantic-ui-react";
import { ImageBlock } from "../../../types";

const uppy = Uppy({
  meta: { type: "iphoneAdPix" },
  restrictions: {
    maxNumberOfFiles: 3,
    maxFileSize: 1048576 * 4,
    allowedFileTypes: [".jpg", ".jpeg", ".png"],
  },
  autoProceed: true,
});

// uppy.use(XHRUpload, {
//   endpoint: "/api/s3",
//   fieldName: "iphoneAdPix",
//   formData: true,
// });

uppy.use(AwsS3, {
  getUploadParameters(file) {
    return fetch("/api/uploads", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    })
      .then((response) => {
        // Parse the JSON response.
        return response.json();
      })
      .then((data) => {
        // Return an object in the correct shape.
        return {
          method: "PUT",
          url: data.url,
          fields: file.meta,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        };
      });
  },
});

export const ImageBlockSettings: VFC<{
  block: ImageBlock;
  onBlockUpdated?: (block: ImageBlock) => void;
}> = () => {
  return (
    <div>
      <MediaLibrary
        trigger={<Image src="/wireframe/image.png" />}
      ></MediaLibrary>
    </div>
  );
};

const MediaLibrary: VFC<{ trigger: React.ReactNode }> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("images");

  const handleTabClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: MenuItemProps
  ) => void = (_, { name }) => setTab(name);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      {/* <Modal.Header>Select a Photo</Modal.Header> */}
      <Menu pointing secondary size="large" style={{ marginBottom: 0 }}>
        <Menu.Item
          name="all"
          active={tab === "all"}
          onClick={handleTabClick}
          content="All"
        ></Menu.Item>
        <Menu.Item
          name="images"
          active={tab === "images"}
          onClick={handleTabClick}
          content="Images"
        ></Menu.Item>
        <Menu.Item
          name="documents"
          active={tab === "documents"}
          onClick={handleTabClick}
          content="Documents"
        ></Menu.Item>
      </Menu>
      <Modal.Content>
        {/* <Button content="Add New"></Button>
        <FileInput uppy={uppy} pretty={true}></FileInput> */}
        <UploadFile></UploadFile>
      </Modal.Content>
    </Modal>
  );
};

const UploadFile: VFC = ({}) => {
  const ref = useRef<HTMLInputElement>();
  useEffect(() => {
    //
    const upload = (event: any) => {
      const files = Array.from(event.target.files);
      console.log("files: ", files);
      files.forEach((file: any) => {
        try {
          uppy.addFile({
            source: "file input",
            name: file.name,
            type: file.type,
            data: file,
          });
        } catch (err) {
          if (err.isRestriction) {
            // handle restrictions
            console.log("Restriction error:", err);
          } else {
            // handle other errors
            console.error(err);
          }
        }
      });
    };
    ref.current?.addEventListener("change", upload);
    return () => {
      ref.current?.removeEventListener("change", upload);
    };
  }, []);
  return (
    <>
      <input
        ref={ref}
        type="file"
        id="my-file-input"
        style={{ display: "none" }}
        accept={[".jpg", ".jpeg", ".png", ".pdf"].join(",")}
      ></input>
      <Button content="Add New" onClick={() => ref.current.click()}></Button>
    </>
  );
};
