import BX24 from 'bx24-api'
import config from '../../config'

export async function embeedFields () {
  //TODO: colocar o handler
  const handler = config.rootUrl + 'cotacao'
  const id = config.HANDLER_ID
  const title = config.TITLE
  const description = config.DESCRIPTION
  try {
    return await BX24.callMethod('userfieldtype.add', {
      USER_TYPE_ID: id,
      HANDLER: handler,
      TITLE: title,
      DESCRIPTION: description
    })
  } catch (e) {
    console.log('reinstall')
    return await BX24.callMethod('userfieldtype.add', {
      USER_TYPE_ID: id,
      HANDLER: handler,
      TITLE: title,
      DESCRIPTION: description
    })
  }
}

export async function unistall () {
  const handler = config.rootUrl + 'cotacao'
  const id = config.HANDLER_ID
  BX24.callMethod(
    'userfieldtype.delete', 
    {
       USER_TYPE_ID: id
    }
 );
  console.log('unistall')
  await BX24.callMethod('placement.unbind', {
    PLACEMENT: 'CRM_LEAD_DETAIL_TAB',
    HANDLER:handler
  })
  return await BX24.callMethod('placement.unbind', {
    PLACEMENT: 'CRM_LEAD_DETAIL_ACTIVITY',
    HANDLER:handler
  })
}

export async function install () {
  console.log('install')
  const response = await embeedFields()
  if (response.sucess == false) {
    if (
      response.result.ex.error_description ==
      'Unable to set placement handler: Handler already binded'
    ) {
      console.log('já instalado')
      return true
    }
  }
  if (response.answer.result) {
    return true
  }

  return false
}
export async function getInfo () {
  return await BX24.placement.info()
}


export async function getDeal (id) {
  return await BX24.callMethod('crm.deal.get', { id: id })
}

export async function getLead (id) {
  return await BX24.callMethod('crm.lead.get', { id: id })
}


export async function getDocEntryFromInfo () {
  const info = await getInfo()

  if (info.options.ENTITY_ID == 'CRM_DEAL') {
    const id = info.options.ENTITY_VALUE_ID
    const deal = await getDeal(id)
    console.log(deal.answer.result.TITLE)
    return deal.answer.result.TITLE
  }
  if (info.options.ENTITY_ID == 'CRM_LEAD') {
    const id = info.options.ENTITY_VALUE_ID
    const lead = await getLead(id)
    console.log(lead.answer.result.TITLE)
    return lead.answer.result.TITLE
  }
}


export async function resize () {
  BX24.resizeWindow(500, 800)
}

