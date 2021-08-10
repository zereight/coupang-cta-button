# -*- coding: utf-8 -*-

import os
import shutil
import zipfile


BUILD_DIR_PATH = os.path.abspath(os.path.dirname(__file__))
ROOT_DIR_PATH = os.path.abspath(os.path.join(BUILD_DIR_PATH, "../"))
BIN_DIR_PATH = os.path.join(BUILD_DIR_PATH, "bin")


if __name__ == "__main__":
    assert os.path.exists(ROOT_DIR_PATH)

    if os.path.exists(BIN_DIR_PATH):
        shutil.rmtree(BIN_DIR_PATH)
    
    os.makedirs(BIN_DIR_PATH)

    path_info = {
        BIN_DIR_PATH: {
            "index.xml": os.path.join(ROOT_DIR_PATH, "index.xml"),
            "skin.html": os.path.join(ROOT_DIR_PATH, "skin.html"),
            "style.css": os.path.join(ROOT_DIR_PATH, "style.css"),
            "preview256.jpg": os.path.join(ROOT_DIR_PATH, "preview256.jpg"),
            "preview560.jpg": os.path.join(ROOT_DIR_PATH, "preview560.jpg"),
            "preview1600.jpg": os.path.join(ROOT_DIR_PATH, "preview1600.jpg")
        },
        os.path.join(BIN_DIR_PATH, "images"): {
            "script.js": os.path.join(ROOT_DIR_PATH, "script.js")
        }
    }

    print("copy files")
    for path, v in path_info.items():
        if not os.path.exists(path):
            os.makedirs(path)

        for filename, src_path in v.items():
            trg_path = os.path.join(path, filename)
            shutil.copy2(src_path, trg_path)

    print("compress files")
    zip_path = "{}.zip".format(BIN_DIR_PATH)

    if os.path.exists(zip_path):
        os.remove(zip_path)

    with zipfile.ZipFile(zip_path, "w") as bin_zip:
        for folder, subfolders, files in os.walk(BIN_DIR_PATH):
            for f in files:
                bin_zip.write(
                    os.path.join(folder, f),
                    os.path.relpath(os.path.join(folder, f), BIN_DIR_PATH),
                    compress_type = zipfile.ZIP_DEFLATED
                )
