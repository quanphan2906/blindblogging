import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import HTMLParser from "react-html-parser";

function BlogEditor({ handleEditorChange, content }) {
    return (
        <div>
            <Editor
                apiKey="ggbytbuql282pp1ll5ctzytdqxnewwkvvu7skgjcknxvtu7z"
                init={{
                    height: 500,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    menubar: "file insert edit view format",
                    toolbar: `undo redo | formatselect | bold italic underline backcolor | 
                        alignleft aligncenter alignright alignjustify | 
                        bullist numlist outdent indent | removeformat | help`,
                    file_browser_callback_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype === "image") {
                            var input = document.getElementById("upload");
                            input.click();
                            input.addEventListener("change", function () {
                                var file = this.files[0];
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    callback(e.target.result, {
                                        alt: "Write the alt text here",
                                        width: "300",
                                        height: "200",
                                    });
                                };
                                reader.readAsDataURL(file);
                            });
                        }
                    },
                    paste_data_images: true,
                }}
                onEditorChange={handleEditorChange}
            />
            <input
                name="image"
                type="file"
                id="upload"
                className="hidden"
            ></input>
            <div>{HTMLParser(content)}</div>
        </div>
    );
}

export default BlogEditor;
