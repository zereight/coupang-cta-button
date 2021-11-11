# -*- coding: utf-8 -*-

import os
import json
import shutil
import zipfile


WORKSPACE_DIR_PATH = os.path.abspath(os.path.dirname(__file__))  # 스크립트 실행 경로
ROOT_DIR_PATH = os.path.abspath(os.path.join(WORKSPACE_DIR_PATH, "../"))  # 프로젝트 루트 경로

# 빌드 산출물 경로
BUILD_DIR_PATH = os.path.join(ROOT_DIR_PATH, "build")

# Source 경로
SRC_DIR_PATH = os.path.join(ROOT_DIR_PATH, "src")
HTML_DIR_PATH = os.path.join(SRC_DIR_PATH, "html")
CSS_DIR_PATH = os.path.join(SRC_DIR_PATH, "css")
JS_DIR_PATH = os.path.join(SRC_DIR_PATH, "javascript")
XML_DIR_PATH = os.path.join(SRC_DIR_PATH, "xml")

# build configuration
CONFIG_FILE_PATH = os.path.join(ROOT_DIR_PATH, "settings", "config.json")


def get_files_by_dir(d):
    """입력받은 경로안의 모든 파일 목록을 가져온다.

    Args
    - d: 대상 경로
    """
    file_list = []
    for cur_path, _, files in os.walk(d):
        for f in files:
            file_list.append(os.path.join(cur_path, f))
    return file_list


if __name__ == "__main__":
    for path in [ROOT_DIR_PATH, WORKSPACE_DIR_PATH, HTML_DIR_PATH, CSS_DIR_PATH, JS_DIR_PATH, CONFIG_FILE_PATH]:
        assert os.path.exists(path), "Not found path. path: {}".format(path)

    html_file_list = get_files_by_dir(HTML_DIR_PATH)
    css_file_list = get_files_by_dir(CSS_DIR_PATH)
    js_file_list = get_files_by_dir(JS_DIR_PATH)
    xml_file_list = get_files_by_dir(XML_DIR_PATH)

    build_path = {
        "html": os.path.join(BUILD_DIR_PATH, "skin.html"),
        "css": os.path.join(BUILD_DIR_PATH, "style.css"),
        "xml": os.path.join(BUILD_DIR_PATH, "index.xml"),
        "js":  os.path.join(BUILD_DIR_PATH, "images", "script.js"),
        "includes": [
            os.path.join(ROOT_DIR_PATH, "preview256.jpg"),
            os.path.join(ROOT_DIR_PATH, "preview560.jpg"),
            os.path.join(ROOT_DIR_PATH, "preview1600.jpg"),
        ],
    }

    # 이전 빌드 산출물 삭제
    if os.path.exists(BUILD_DIR_PATH):
        shutil.rmtree(BUILD_DIR_PATH)
    os.makedirs(os.path.join(BUILD_DIR_PATH, "images"))

#     copy_files(path_info)
#
#     compile(os.path.join(SKIN_DIR_PATH, "index.xml"))
#     compile(os.path.join(SKIN_DIR_PATH, "skin.html"))
#     compile(os.path.join(SKIN_DIR_PATH, "style.css"))
#
#     compress()



def copy_files(path_info):
    for path, v in path_info.items():
        if not os.path.exists(path):
            os.makedirs(path)

        for filename, src_path in v.items():
            trg_path = os.path.join(path, filename)
            shutil.copy2(src_path, trg_path)


def compile(path):
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        config = json.loads(f.read())

    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    with open(path, "w", encoding="utf-8") as f:
        compiled = raw
        for k, v in config.items():
            compiled = compiled.replace(v["replace"], v["value"])
        f.write(compiled)


def compress():
    zip_path = "{}.zip".format(SKIN_DIR_PATH)

    if os.path.exists(zip_path):
        os.remove(zip_path)

    with zipfile.ZipFile(zip_path, "w") as bin_zip:
        for folder, subfolders, files in os.walk(SKIN_DIR_PATH):
            for f in files:
                bin_zip.write(
                    os.path.join(folder, f),
                    os.path.relpath(os.path.join(folder, f), SKIN_DIR_PATH),
                    compress_type = zipfile.ZIP_DEFLATED
                )


