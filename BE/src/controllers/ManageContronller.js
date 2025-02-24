import * as services from '../services';

export const load_data_user_admin = async (req, res) => {
    try {
        const response = await services.load_data_user_service();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}


export const load_data_class_room_admin = async (req, res) => {
    try {

        const { id_room } = req.body;
        const response = await services.load_data_class_room_service(id_room);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}

export const load_data_discipline_admin = async (req, res) => {
    try {

        const select = ' select  * from discipline d '
        const response = await services.load_data_all_service(select);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error load_data_discipline_admin'
        })
    }
}

export const load_data_room_admin = async (req, res) => {
    try {

        const select = 'select *from room r'
        const response = await services.load_data_all_service(select);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error load_data_room_admin'
        })
    }
}

export const load_data_class_period_admin = async (req, res) => {
    try {

        const select = 'select *from class_period cp'
        const response = await services.load_data_all_service(select);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error load_data_room_admin'
        })
    }
}

export const load_data_status_admin = async (req, res) => {
    try {

        const select = 'select * from status s'
        const response = await services.load_data_all_service(select);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error load_data_status_admin'
        })
    }
}

export const load_data_user_offline = async (req, res) => {
    try {
        const response = await services.load_data_user_offline();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error load_data_user_offline'
        })
    }
}

export const insert_data_class_room = async (req, res) => {
    try {
        const { roomId,
                disciplineId,
                thu,
                classPeriodId,
                statusId,
                userId,
                start_time,
                end_time} = req.body;
        const response = await services.insert_new_data_class_room({
            roomId,
            disciplineId,
            thu,
            classPeriodId,
            statusId,
            userId,
            start_time,
            end_time
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error load_data_user_offline'
        })
    }
}


export const delete_data_class_room = async (req, res) => {
    try {
        const {class_room_id} = req.body;
        const response = await services.delete_data_class_room({class_room_id});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error delete_data_class_room'
        })
    }
}

export const search_data_class_room = async (req, res) => {
    try {
        const {fullname} = req.body;
        const response = await services.load_data_search_class_room_service({fullname});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error delete_data_class_room'
        })
    }
}