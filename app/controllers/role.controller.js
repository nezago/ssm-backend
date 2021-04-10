import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { RoleServiceInstance } = services;
const { created, ok } = successCodes;
const { internalServerError, notFound } = failureCodes;
const { roleCreateSuccess, recordFound, updateSuccess } = successMessages;
const { noRecordFound, deleteRecordFail, roleCreateFail, updateFail } = errorMessages;

/**
 * @class
 */
class RoleController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /roles
   */
  all = async (req, res) => {
    const gottenRoles = await RoleServiceInstance.getAll();
    if (gottenRoles.count > 0) {
      sendSuccessResponse(res, ok, recordFound, null, gottenRoles);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /roles/create
   */
  create = async (req, res) => {
    const createdRole = await RoleServiceInstance.saveAll(req.body);
    if (createdRole) {
      sendSuccessResponse(res, created, roleCreateSuccess, null, createdRole);
    } else {
      sendErrorResponse(res, internalServerError, roleCreateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /roles/all/:roleId
   */
  show = async (req, res) => {
    let foundRole = await RoleServiceInstance.getBy({ id: req.params.roleId });
    if (foundRole) {
      foundRole = foundRole.dataValues;
      sendSuccessResponse(res, ok, recordFound, null, foundRole);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {void}
   * @description PATCH: /roles/:userId
   */
  update = async (req, res) => {
    const dataToUpdate = req.body;
    const whereCondition = { id: req.params.roleId}
    const roleUpdateInfo = await RoleServiceInstance.updateBy(dataToUpdate, whereCondition);
    if (roleUpdateInfo[0]) {
      sendSuccessResponse(res, ok, updateSuccess, null, roleUpdateInfo);
    } else {
      sendErrorResponse(res, internalServerError, updateFail);
    }
  }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description DELETE: /users/:userId
  //  */
  // delete = async (req, res) => {

  // }
}

export default RoleController;