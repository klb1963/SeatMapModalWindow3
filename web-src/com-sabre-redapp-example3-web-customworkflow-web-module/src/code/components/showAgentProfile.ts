import {AgentProfileService} from 'sabre-ngv-app/app/services/impl/AgentProfileService';
import {openCustomFormParagraph} from '../utils/openCustomFormParagraph';
import {getService} from '../Context';

const NOT_AVAILABLE = 'Not Available';
export const showAgentProfile = (): void => {

    const service: AgentProfileService = getService(AgentProfileService);
    const agentId = service.getAgentId() || NOT_AVAILABLE;
    const locale = service.getLocale() || NOT_AVAILABLE;
    const pcc = service.getPcc() || NOT_AVAILABLE;
    const country = service.getCountry() || NOT_AVAILABLE;
    const region = service.getRegion() || NOT_AVAILABLE;
    const customerBusinessUnit = service.getCustomerBusinessUnit() || NOT_AVAILABLE;
    const customerEmployeeId = service.getCustomerEmployeeId() || NOT_AVAILABLE;

    const agentProfileDescription = `Agent ID: **${agentId}**\n` +
        `Pseudo City Code: **${pcc}**\n` +
        `Agent's Agency Country: **${country}**\n` +
        `Agent's Agency Region: **${region}**\n` +
        `Agent's Locale: **${locale}**\n` +
        `Customer Business Unit: **${customerBusinessUnit}**\n` +
        `Customer Employee ID: **${customerEmployeeId}**\n`;
    openCustomFormParagraph('Agent Profile', agentProfileDescription)
}