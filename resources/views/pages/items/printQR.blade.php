<!DOCTYPE html>
<html>

<head>
</head>

<body>
    <table style="width: 100%; height: 100vh;">
        <tbody>
            <tr>
                <td style="vertical-align: middle; text-align: center;">
                    <table style="width: auto; margin: auto; padding: 20px; border: 1px solid black;">
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <img src="data:image/png;base64,{!! base64_encode(QrCode::size(30)->generate($item->id)) !!}" width="100"
                                            height="100" alt="QR Code">
                                    </div>
                                </td>
                                <td>
                                    <div style='padding: 8px;'>
                                        <div>
                                            <p style='margin: 0;'>ID: <b>{{ $item->id_number }}</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Nama: <b>{{ $item->name }}</b></p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Category:
                                                <b>{{ $item->category->name ?? 'Category not found' }}</b>
                                            </p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Description:
                                                <b>{{ strlen($item->description) > 10 ? substr($item->description, 0, 10) . '...' : $item->description }}</b>
                                            </p>
                                        </div>
                                        <div>
                                            <p style='margin: 0;'>Tahun: <b>2021</b></p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
