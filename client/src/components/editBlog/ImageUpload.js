import React from "react";

function ImageUpload({ previewImgUrl, handleFileSelected, handleChange }) {
    return (
        <div className="upload-wrapper">
            <h3>Upload cover image</h3>
            <div className="upload-container">
                <img
                    src={previewImgUrl}
                    alt="preview your image here"
                    className="image-preview"
                />
                <div className="upload-input">
                    <input type="file" onChange={handleFileSelected} />

                    <textarea
                        id="altText"
                        type="text"
                        placeholder="Add alt text for the picture here"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;
