import {type Ref, ref} from 'vue'
import {defineStore} from 'pinia'
import type {INotice, TNoticeTypes} from "@/types/utils.ts";



export const useNoticeStore = defineStore('notices', () => {
	
	const notices: Ref<INotice[]> = ref([]);
	const noticeShowTime = 6;
	
	const addNotice = (noticeText: string, type: TNoticeTypes = 'notify') => {
		if(!noticeText) {
			return;
		}
		
		const preparedNotice = prepareNotice(noticeText, type);
		
		notices.value.unshift(preparedNotice);
		
		setupRemoveTask(preparedNotice.id, 1000 * noticeShowTime);
	}
	
	const addErrorNotice = (noticeText: string) => {
		return addNotice(noticeText, 'error');
	}
	const addWarningNotice = (noticeText: string) => {
		return addNotice(noticeText, 'warning');
	}
	
	const prepareNotice = (noticeText: string, type: TNoticeTypes): INotice => {
		return {
			id: new Date().getTime(),
			message: noticeText,
			type: type,
		}
	}
	
	const setupRemoveTask = (noticeId: number, time: number) => {
		setTimeout(() => {
			removeNotice(noticeId);
		}, time);
	}
	
	const removeNotice = (noticeId: number) => {
		notices.value = notices.value.filter(el => el.id !== noticeId);
	}
	
	return {
		notices,
		addNotice,
		addErrorNotice,
		addWarningNotice,
		removeNotice
	}
})