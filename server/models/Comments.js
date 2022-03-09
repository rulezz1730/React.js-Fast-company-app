const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: { type: String, required: true },
        //На чьей странице находятся комментарии
        pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        //Id пользователя кто оставил комментарий
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
);

module.exports = model("Comments", schema);
