"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkController = void 0;
const link_service_1 = require("./link.service");
class LinkController extends link_service_1.LinkService {
    constructor() {
        super(...arguments);
        /**
         * Create a Short Link
         * @param req
         * @param res
         *
         */
        this.createLink = (req, res) => {
            const { link, userID } = req.body;
            console.log('link:' + link + ' userID:' + userID);
            this._createLink(link, userID).then((resp) => {
                res.status(resp["status"]).json({
                    success: true,
                    msg: "Link created",
                    link: resp.data
                });
            }).catch((err) => {
                res.status(parseInt(err.status)).json({
                    success: false,
                    msg: err["msg"],
                    err: err.error
                });
            });
        };
        /**
         * Get a Link
         * @param req
         * @param res
         * @param next
         */
        this.getLink = (req, res, next) => {
            const { linkID } = req.params;
            console.log(req.params);
            console.log("link id:" + linkID);
            this._getLink(linkID).then((data) => {
                // console.log("jwt token:" + tk);
                res.status(200).json({
                    success: true,
                    msg: "Link found",
                    user: data
                });
            }).catch((resp) => {
                console.log("user not found:" + resp["status"]);
                res.status(404).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * Get a Link
         * @param req
         * @param res
         * @param next
         */
        this.deleteLink = (req, res, next) => {
            const { linkID } = req.params;
            console.log(req.params);
            console.log("link id:" + linkID);
            this._deleteLink(linkID).then((data) => {
                res.status(200).json({
                    success: true,
                    msg: "Link Deleted",
                    user: data
                });
            }).catch((resp) => {
                console.log("Link deleting failed:" + resp["status"]);
                res.status(404).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * Get a Link
         * @param req
         * @param res
         * @param next
         */
        this.updateLink = (req, res, next) => {
            const { linkID, newLink, token } = req.body;
            console.log(req.body);
            console.log("link id:" + linkID);
            this._updateLink(linkID, newLink).then((data) => {
                res.status(200).json({
                    success: true,
                    msg: "Link Updated",
                    data: data
                });
            }).catch((resp) => {
                console.log("Link updating failed:" + resp["status"]);
                res.status(404).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
    }
}
exports.LinkController = LinkController;
exports.default = new LinkController();
