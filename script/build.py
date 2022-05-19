# -*- coding: utf-8 -*-

import os
import sys
import json
import shutil
import zipfile

ENV_DEV = "DEV"
ENV_PROD = "PROD"

WORKSPACE_DIR_PATH = os.path.abspath(os.path.dirname(__file__))  # 스크립트 실행 경로
ROOT_DIR_PATH = os.path.abspath(os.path.join(WORKSPACE_DIR_PATH, "../"))  # 프로젝트 루트 경로

# 빌드 산출물 경로
BUILD_DIR_PATH = os.path.join(ROOT_DIR_PATH, "build")
BUILD_SRC_DIR_PATH = os.path.join(BUILD_DIR_PATH, "src")
BUILD_ZIP_DIR_PATH = os.path.join(BUILD_DIR_PATH, "zip")

# Source 경로
SRC_DIR_PATH = os.path.join(ROOT_DIR_PATH, "src")
HTML_DIR_PATH = os.path.join(SRC_DIR_PATH, "html")
CSS_DIR_PATH = os.path.join(SRC_DIR_PATH, "css")
JS_DIR_PATH = os.path.join(SRC_DIR_PATH, "javascript")
XML_DIR_PATH = os.path.join(SRC_DIR_PATH, "xml")
ASSETS_DIR_PATH = os.path.join(SRC_DIR_PATH, "assets")

# build configuration
CONFIG_FILE_PATH = os.path.join(ROOT_DIR_PATH, "settings", "config.json")

def get_package_json():
    """package.json에서 version 정보를 가지고 온다."""
    with open(os.path.join(ROOT_DIR_PATH, "package.json"), "rb") as f:
        package = f.read().decode("utf-8")
        package_json = json.loads(package)
    return package_json


def get_configuration():
    """configuration 값을 읽어온다."""
    with open(CONFIG_FILE_PATH, "rb") as f:
        config = f.read().decode("utf-8")
    return json.loads(config)


def get_files_by_dir(d, entry_point=None):
    """입력받은 경로안의 모든 파일 목록을 가져온다.

    Args
    - d: 대상 경로
    """
    file_list = []
    for cur_path, _, files in os.walk(d):
        for f in files:
            file_list.append(os.path.join(cur_path, f))
    return file_list


def build_html(entry_point, html_files):
    """html 코드들을 빌드한다.

    Args
    - entry_point: 진입점 파일명
    - html_files: html 파일 목록
    """
    target_filepath = os.path.join(BUILD_SRC_DIR_PATH, entry_point)

    with open(os.path.join(HTML_DIR_PATH, entry_point), 'rb') as f:
        compiled_code = f.read().decode("utf-8")

    for path in html_files:
        if entry_point in path:
            continue
        filename = os.path.basename(path).split(".")[0]
        replacer = "<!--berry_{}-->".format(filename)
        with open(path, 'rb') as f:
            code = f.read().decode("utf-8")

        if filename not in ["index-page", "permalink-page"]:
            code = "<!-- BEGIN: {} -->\n".format(filename) + code + "<!-- END: {} -->\n" .format(filename)

        for line in compiled_code.split("\n"):
            if replacer in line:
                indent = len(line.split("<")[0])
                break

        code = ("\n" + " " * indent).join(code.split("\n"))
        compiled_code = compiled_code.replace(replacer, code)

    with open(target_filepath, "w", encoding="utf-8") as f:
        f.write(compiled_code)


def build_css(entry_point, css_files):
    """css 코드들을 빌드한다.

    Args
    - entry_point: 진입점 파일 경로
    - css_files: css 파일 목록
    """
    target_filepath = os.path.join(BUILD_SRC_DIR_PATH, entry_point)

    with open(os.path.join(CSS_DIR_PATH, entry_point), 'rb') as f:
        compiled_code = f.read().decode("utf-8")

    for path in css_files:
        filename = os.path.basename(path).split(".")[0]
        replacer = "/*berry_{}*/".format(filename)
        is_dark_theme = 'dark' in filename
        with open(path, 'rb') as f:
            code = f.read().decode("utf-8")

        code = "/* BEGIN: {}.css */\n".format(filename) + code + "/* END: {}.css */\n" .format(filename)

        for line in compiled_code.split("\n"):
            if replacer in line:
                indent = len(line.split("/*")[0])
                break

        code = ("\n" + " " * indent).join(list(map(
            lambda c: '{} {}'.format('body.dark-theme', c.strip()) if is_dark_theme and len(c) >= 1 and c.strip()[-1] in ['{', ','] and 'body.dark-theme' not in c and "@media" not in c else c,
            code.split("\n")
        )))
        compiled_code = compiled_code.replace(replacer, code)

    with open(target_filepath, "w", encoding="utf-8") as f:
        f.write(compiled_code)


def build_javascript(entry_point, env=ENV_DEV, html_entry_point=None):
    js_path = os.path.join(BUILD_SRC_DIR_PATH, "images", entry_point)

    indent = " " * 4
    javascript_tag = "{}<script type=\"text/javascript\" src=\"./images/{}\"></script>".format(indent, entry_point)
    if env == ENV_DEV and html_entry_point is not None:
        javascript_tag = ["{}<script type=\"text/javascript\">".format(indent)]
        with open(js_path, "rb") as f:
            js_code = f.read().decode("utf-8")
            for code in js_code.split("\n"):
                javascript_tag.append("{}{}".format(indent, code))
            javascript_tag.append("{}</script>".format(indent))
            javascript_tag = "\n".join(javascript_tag)

    html_path = os.path.join(BUILD_SRC_DIR_PATH, html_entry_point)
    with open(html_path, 'rb') as f:
        html_code = f.read().decode("utf-8")

    next_html_code = []
    for code in html_code.split("\n"):
        next_html_code.append(code)
        if "<!-- Javascript -->" in code:
            next_html_code.append(javascript_tag)

    with open(html_path, "w", encoding="utf-8") as f:
        f.write("\n".join(next_html_code))

def build_xml(entry_point):
    target_filepath = os.path.join(BUILD_SRC_DIR_PATH, entry_point)

    with open(os.path.join(XML_DIR_PATH, entry_point), 'rb') as f:
        raw_code = f.read().decode("utf-8")

    package_json = get_package_json()
    raw_code = raw_code.replace("${{version}}", package_json["version"])
    raw_code = raw_code.replace("${{description}}", package_json["description"])
    raw_code = raw_code.replace("${{license}}", package_json["author"])
    raw_code = raw_code.replace("${{author}}", package_json["author"].split()[0])
    raw_code = raw_code.replace("${{homepage}}", "https://memostack.tistory.com/")
    raw_code = raw_code.replace("${{email}}", "public.bluemiv@gmail.com")

    with open(target_filepath, "w", encoding="utf-8") as f:
        f.write(raw_code)


def copy(src, trg_path):
    """파일을 복사한다"""
    if not os.path.exists(trg_path):
        os.makedirs(trg_path)

    filename = os.path.basename(src)
    full_trg_path = os.path.join(trg_path, filename)
    shutil.copy2(src, full_trg_path)


if __name__ == "__main__":
    env = ENV_DEV
    if len(sys.argv) >= 2 and sys.argv[1].lower() == "prod":
        env = ENV_PROD

    for path in [ROOT_DIR_PATH, WORKSPACE_DIR_PATH, HTML_DIR_PATH, CSS_DIR_PATH, JS_DIR_PATH, CONFIG_FILE_PATH]:
        assert os.path.exists(path), "Not found path. path: {}".format(path)

    config = get_configuration()
    entry_point = config["entry_point"]

    html_file_list = get_files_by_dir(HTML_DIR_PATH, entry_point=entry_point["html"])
    css_file_list = get_files_by_dir(CSS_DIR_PATH, entry_point=entry_point["css"])
    xml_file_list = get_files_by_dir(XML_DIR_PATH)

    # html
    build_html(entry_point["html"], html_file_list)

    # css
    build_css(entry_point["css"], css_file_list)

    # javascript
    build_javascript(entry_point["js"], env=env, html_entry_point=entry_point["html"])

    # xml
    build_xml(entry_point["xml"])


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


