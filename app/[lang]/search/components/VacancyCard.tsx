import { FaArrowRight } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { rooms } from "@/data/roomsData";
import { Locale } from "@/i18n-config";
import Carousel from '../../components/Carousel';

export default function VacancyCard({
    apartmentVacancies,
    lang,
    handleClick
} : {
    apartmentVacancies: Vacancy
    lang: Locale
    handleClick: (from: string, to: string) => void
}) {

    const { apartmentId, vacancies } = apartmentVacancies

    return (
        <Card className="border-1 border-gray-500 text-gray-500 font-bold animate-fade-in md:hover:scale-105 ">

            <CardHeader className="flex-col items-start p-0">
                <Carousel images={rooms[+apartmentId].images} showThumbs={false} showAlwaysArrows />
            </CardHeader>

            <CardBody className="overflow-visible p-0 bg-gray-200">

                <h4 className="font-bold text-xl text-white bg-background p-4 text-center">{rooms[+apartmentId]?.name || apartmentId}</h4>

                <div key={apartmentId} className="p-4 rounded space-y-2">
                    {vacancies.length > 0 ? 
                    vacancies.map((vacancy, index) => 
                        <Button 
                            onPress={() => handleClick(new Date(vacancy.from).toLocaleDateString('en-CA'), new Date(vacancy.to).toLocaleDateString('en-CA'))}
                            key={index}
                            className="flex items-center justify-center gap-1 w-full text-background font-bold"
                        >
                            {new Date(vacancy.from).toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: '2-digit' })}
                            <FaArrowRight className="mb-0.5" />
                            {new Date(vacancy.to).toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </Button>)
                    :
                        <p>{lang === "it" ? "Nessuna disponibilità" : "No availability"}</p>
                    }
                </div>
            </CardBody>
        </Card>
    );
}
