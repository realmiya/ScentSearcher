package com.les.entity;

public class JsonResult<T> {
    private T data;
    private  String code;
    private  String msg;

    public JsonResult() {
        this.code = "0";
        this.msg = "操作成功！";
    }

    public JsonResult(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public JsonResult(T data) {
        this.data = data;
        this.msg="操作成功！";
        this.code="0";
    }

    public JsonResult(T data, String msg) {
        this.data = data;
        this.msg = msg;
        this.code="0";
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public JsonResult ok(){
        this.msg="ok";
        this.code = "0";
        return this;
    }

    @Override
    public String toString() {
        return "{" +
                "data:" + data +
                ", code:'" + code + '\'' +
                ", msg:'" + msg + '\'' +
                '}';
    }
}