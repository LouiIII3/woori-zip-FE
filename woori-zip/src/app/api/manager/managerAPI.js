'use server';

import { instance } from '../instance';

// 관리자 목록 조회
export const getManagerList = async () => {
  try {
    return await instance('manager/list', {
      method: 'GET'
    });
  } catch (error) {
    console.error('Failed to fetch manager list:', error);
    throw error;
  }
};

// 에이전트 목록 조회
export const getAgentList = async () => {
  try {
    return await instance('agent/list', {
      method: 'GET'
    });
  } catch (error) {
    console.error('Failed to fetch agent list:', error);
    throw error;
  }
};

// 회원 목록 조회
export const getMembersList = async () => {
  try {
    return await instance('members/list', {
      method: 'GET'
    });
  } catch (error) {
    console.error('Failed to fetch members list:', error);
    throw error;
  }
};

// 권한 일괄 변경 (공통)
export const updateBulkPermissions = async (ids, action, type) => {
  try {
    return await instance(`${type}/permissions/bulk`, {
      method: 'PUT',
      body: JSON.stringify({
        ids,
        action
      })
    });
  } catch (error) {
    console.error('Failed to update permissions:', error);
    throw error;
  }
};