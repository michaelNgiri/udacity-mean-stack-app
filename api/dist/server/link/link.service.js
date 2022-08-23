"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkService = void 0;
const link_model_1 = require("./link.model");
class LinkService {
    constructor() {
        /**
         * Create Link
         * @param link
         * @param userID
         *
         */
        this._createLink = (link, userID) => {
            console.log('in the link service');
            console.log('link:' + link + ' userID:' + userID);
            console.log('short link:' + uniqueURL());
            return new Promise((resolve, reject) => {
                link_model_1.Link.create({ original_link: link, short_link: `https://links.io/${uniqueURL()}-${uniqueURL()}`, link_owner_id: userID })
                    .then((link) => {
                    if (link) {
                        resolve({ success: true, data: link, status: 200, msg: "Link created successfully" });
                    }
                }).catch((err) => {
                    reject({ status: 403, error: err });
                });
            });
        };
        /**
         * Find a Link
         * @param linkID
         */
        this._getLink = async (linkID) => {
            console.log("getting a link");
            return new Promise((resolve, reject) => {
                console.log('making a promise');
                link_model_1.Link.findOne({ where: { id: linkID } }).then((link) => {
                    if (link) {
                        resolve({ data: link, status: 200, msg: "link found!" });
                    }
                    else {
                        resolve({ data: link, status: 404, msg: "link with that id does not exist!" });
                    }
                }).catch((err) => {
                    console.log('error:' + err);
                    reject({ status: 403, msg: err });
                });
            });
        };
        /**
         * Find a Link
         * @param linkID
         */
        this._deleteLink = async (linkID) => {
            console.log("deleting a link:" + linkID);
            return new Promise((resolve, reject) => {
                link_model_1.Link.destroy({ where: { id: linkID } }).then(() => {
                    resolve({ status: 201, msg: "link deleted" });
                }).catch(() => {
                    reject({ status: 403, msg: 'an error occurred, the link is not in our record' });
                });
            });
        };
        /**
         * Find a Link
         * @param linkID
         * @param newLink
         */
        this._updateLink = async (linkID, newLink) => {
            console.log("updating a link:" + linkID);
            return new Promise((resolve, reject) => {
                link_model_1.Link.update({ original_link: newLink }, { where: { id: 1 } })
                    .then((link) => {
                    resolve({ success: true, data: link, status: 200, msg: "Link updated successfully" });
                })
                    .catch((err) => {
                    console.log(err);
                    reject({ status: 403, msg: 'an error occurred, the link is not in our record' });
                });
            });
        };
    }
}
exports.LinkService = LinkService;
const uniqueURL = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
