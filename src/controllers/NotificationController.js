import * as services from '../services';

export const load_data_notifications_awaiting_approval_admin = async (req, res) => {
    try {
        const response = await services.load_data_notifications_awaiting_approval_admin();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}

export const load_count_notifications_awaiting_approval_admin = async (req, res) => {
    try {
        const response = await services.load_count_notifications_awaiting_approval_admin();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}

export const insert_notifications_awaiting_approval_admin = async (req, res) => {
    try {
        const data = req.body;
        const body = data[0]
        console.log(body)
        const userId = body.user_id,
            roomId = body.room_id,
            disciplineId = data[1],
            thu = body.thu,
            classPeriodId = body.class_period_id,
            statusId = body.status_room,
            start_time = body.start_day,
            end_time = body.end_day
        const response_insert = await services.insert_new_data_class_room({
            roomId,
            disciplineId,
            thu,
            classPeriodId,
            statusId,
            userId,
            start_time,
            end_time
        });

        await services.update_notifications_awaiting_approval_admin(3, body.id);
        // const response_count = await services.load_count_notifications_awaiting_approval_admin();

        return res.status(200).json(response_insert);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}