@echo off
echo 开始压缩js代码...
%cd%\compressor.exe config-all-js.xml js
echo 开始压缩css代码...
%cd%\compressor.exe config-all-css.xml css
@pause